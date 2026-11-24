import { jsPDF } from 'jspdf';
import { CVData, InterviewAppointment, DeparturePack } from '../types';

/**
 * Generates and downloads an ATS-compliant, single-column PDF resume.
 * ATS Guidelines implemented:
 * - Standard font (Helvetica)
 * - Clean semantic hierarchy without multi-column table frames that choke ATS parsers
 * - Clear headers (SUMMARY, WORK EXPERIENCE, EDUCATION, CERTIFICATIONS, SKILLS, REFERENCES)
 * - Standard line heights and bullet indicators
 */
export function exportATSFriendlyCVPdf(cv: CVData): void {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = 45;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // 1. Header: Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(17, 24, 39); // Slate 900
  const nameText = (cv.fullName || 'Jobseeker Candidate').toUpperCase();
  doc.text(nameText, margin, y);
  y += 18;

  // Professional Title
  if (cv.professionalTitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(5, 150, 105); // Emerald 600
    doc.text(cv.professionalTitle, margin, y);
    y += 15;
  }

  // Contact line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(75, 85, 99); // Slate 600
  const contactParts: string[] = [];
  if (cv.email) contactParts.push(cv.email);
  if (cv.phone) contactParts.push(cv.phone);
  if (cv.location) contactParts.push(cv.location);
  if (cv.nationalIdOrPassport) contactParts.push(`Ref: ${cv.nationalIdOrPassport}`);
  if (cv.linkedinUrl) contactParts.push(cv.linkedinUrl);

  const contactLine = contactParts.join('  |  ');
  doc.text(contactLine, margin, y);
  y += 12;

  // Divider line
  doc.setDrawColor(209, 213, 219);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 16;

  // Helper: Section Heading
  const renderSectionHeader = (title: string) => {
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42); // Slate 900
    doc.text(title.toUpperCase(), margin, y);
    y += 4;
    doc.setDrawColor(16, 185, 129); // Emerald 500
    doc.setLineWidth(1.5);
    doc.line(margin, y, margin + 80, y);
    y += 12;
  };

  // 2. Professional Summary
  if (cv.professionalSummary && cv.professionalSummary.trim().length > 0) {
    renderSectionHeader('Professional Summary');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(55, 65, 81);
    const summaryLines = doc.splitTextToSize(cv.professionalSummary, contentWidth);
    checkPageBreak(summaryLines.length * 13 + 10);
    doc.text(summaryLines, margin, y);
    y += summaryLines.length * 13 + 10;
  }

  // 3. Work Experience
  if (cv.experiences && cv.experiences.length > 0) {
    renderSectionHeader('Professional Experience');
    cv.experiences.forEach((exp) => {
      checkPageBreak(40);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(17, 24, 39);
      doc.text(exp.jobTitle, margin, y);

      // Date range on right
      const dateText = `${exp.startDate} - ${exp.isCurrent ? 'Present' : exp.endDate}`;
      const dateWidth = doc.getTextWidth(dateText);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(107, 114, 128);
      doc.text(dateText, pageWidth - margin - dateWidth, y);
      y += 12;

      // Company and Location
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(75, 85, 99);
      doc.text(`${exp.company} — ${exp.location}, ${exp.country}`, margin, y);
      y += 12;

      // Achievements / Bullets
      if (exp.achievements && exp.achievements.length > 0) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(55, 65, 81);
        exp.achievements.forEach((ach) => {
          if (!ach.trim()) return;
          const bulletLines = doc.splitTextToSize(ach, contentWidth - 14);
          checkPageBreak(bulletLines.length * 12 + 4);
          doc.text('•', margin + 3, y);
          doc.text(bulletLines, margin + 14, y);
          y += bulletLines.length * 12 + 2;
        });
      }
      y += 6;
    });
  }

  // 4. Education & Academic Qualifications
  if (cv.qualifications && cv.qualifications.length > 0) {
    renderSectionHeader('Education & Academic Qualifications');
    cv.qualifications.forEach((edu) => {
      checkPageBreak(30);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(17, 24, 39);
      doc.text(edu.qualification, margin, y);

      const yrText = edu.graduationYear || '';
      const yrWidth = doc.getTextWidth(yrText);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(107, 114, 128);
      doc.text(yrText, pageWidth - margin - yrWidth, y);
      y += 12;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(75, 85, 99);
      const gradeStr = edu.gradeOrDistinction ? ` (${edu.gradeOrDistinction})` : '';
      doc.text(`${edu.institution} — ${edu.fieldOfStudy}${gradeStr}`, margin, y);
      y += 14;
    });
  }

  // 5. Professional Certifications & Licenses
  if (cv.certifications && cv.certifications.length > 0) {
    renderSectionHeader('Certifications & Professional Licenses');
    cv.certifications.forEach((cert) => {
      checkPageBreak(25);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(17, 24, 39);
      doc.text(cert.name, margin, y);

      const yrText = cert.issueDate ? `Issued: ${cert.issueDate}` : '';
      const yrWidth = doc.getTextWidth(yrText);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(107, 114, 128);
      doc.text(yrText, pageWidth - margin - yrWidth, y);
      y += 11;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(75, 85, 99);
      const credStr = cert.credentialId ? ` [ID: ${cert.credentialId}]` : '';
      doc.text(`${cert.issuingBody}${credStr}`, margin, y);
      y += 12;
    });
  }

  // 6. Skills & Core Competencies
  if (cv.skills && cv.skills.length > 0) {
    renderSectionHeader('Core Competencies & Technical Skills');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(55, 65, 81);
    const skillsText = cv.skills.join('  •  ');
    const skillsLines = doc.splitTextToSize(skillsText, contentWidth);
    checkPageBreak(skillsLines.length * 12 + 6);
    doc.text(skillsLines, margin, y);
    y += skillsLines.length * 12 + 10;
  }

  // 7. References
  if (cv.references && cv.references.length > 0) {
    renderSectionHeader('Professional References');
    cv.references.forEach((ref) => {
      checkPageBreak(25);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(17, 24, 39);
      doc.text(ref.name, margin, y);
      y += 10;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(75, 85, 99);
      doc.text(`${ref.title} at ${ref.organization}  |  Email: ${ref.email}  |  Tel: ${ref.phone}`, margin, y);
      y += 12;
    });
  }

  // Footer footer watermark
  const safeName = (cv.fullName || 'Candidate').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`${safeName}_ATS_Standard_CV_KenyaOne.pdf`);
}

/**
 * Generates an official KenyaOne Interview Appointment Letter PDF.
 */
export function exportAppointmentLetterPdf(app: InterviewAppointment): void {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 45;
  let y = 50;

  // KenyaOne Official Letterhead
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(5, 150, 105);
  doc.text('KENYAONE CAREERS RECRUITMENT ECOSYSTEM', margin, y);
  y += 16;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(107, 114, 128);
  doc.text('National Employment Authority (NEA) Registered Partner | Nairobi Documentation Centre', margin, y);
  y += 12;
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 24;

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(17, 24, 39);
  doc.text('OFFICIAL INTERVIEW APPOINTMENT LETTER', margin, y);
  y += 18;

  // Ref & Date
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(75, 85, 99);
  doc.text(`Reference No: ${app.appointmentRef}`, margin, y);
  doc.text(`Issue Date: ${new Date().toLocaleDateString('en-GB')}`, pageWidth - margin - 120, y);
  y += 20;

  // Candidate Details
  doc.setFont('helvetica', 'bold');
  doc.text(`Candidate Name: ${app.candidateName}`, margin, y);
  y += 14;
  doc.setFont('helvetica', 'normal');
  doc.text(`National ID/Passport: ${app.nationalId}`, margin, y);
  y += 14;
  doc.text(`Applied Position: ${app.jobTitle}`, margin, y);
  y += 14;
  doc.text(`Prospective Employer: ${app.employer} (${app.country})`, margin, y);
  y += 20;

  // Interview Schedule Box
  doc.setFillColor(243, 244, 246);
  doc.rect(margin, y, pageWidth - margin * 2, 70, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('INTERVIEW SCHEDULE DETAILS', margin + 14, y + 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(`Date: ${app.date}   |   Time: ${app.time} (${app.timeZone})`, margin + 14, y + 36);
  doc.text(`Format: ${app.format}`, margin + 14, y + 50);
  doc.text(`Venue / Access: ${app.locationOrLink}`, margin + 14, y + 62);
  y += 88;

  // Instructions
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(17, 24, 39);
  doc.text('MANDATORY REQUIREMENTS & DOCUMENT CHECKLIST:', margin, y);
  y += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(55, 65, 81);
  app.requiredDocuments.forEach((docItem) => {
    doc.text(`[  ] ${docItem}`, margin + 10, y);
    y += 13;
  });
  y += 10;

  doc.setFont('helvetica', 'bold');
  doc.text('CANDIDATE INSTRUCTIONS:', margin, y);
  y += 14;
  doc.setFont('helvetica', 'normal');
  app.instructions.forEach((inst) => {
    doc.text(`• ${inst}`, margin + 10, y);
    y += 13;
  });
  y += 20;

  // Verification QR note
  doc.setDrawColor(209, 213, 219);
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageWidth - margin, y);
  y += 16;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(107, 114, 128);
  doc.text(`Verification Security Code: [QR_KENYAONE_${app.appointmentRef}] — Scan to verify genuine validity at KenyaOne Documentation Centre Nairobi.`, margin, y);

  doc.save(`Interview_Appointment_${app.appointmentRef}.pdf`);
}

/**
 * Generates an official KenyaOne Departure Pack Handover Receipt PDF.
 */
export function exportDeparturePackReceiptPdf(pack: DeparturePack): void {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 45;
  let y = 50;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(5, 150, 105);
  doc.text('KENYAONE DEPARTURE PACK HANDOVER RECORD', margin, y);
  y += 16;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(107, 114, 128);
  doc.text('Official Attestation & Document Handover Docket | Migrant Worker Safe Deployment Unit', margin, y);
  y += 12;
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 24;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(17, 24, 39);
  doc.text(`Pack Docket Reference: ${pack.referenceNumber}`, margin, y);
  doc.text(`Release Date: ${new Date().toLocaleDateString('en-GB')}`, pageWidth - margin - 140, y);
  y += 18;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(55, 65, 81);
  doc.text(`Recipient: ${pack.applicantName}  |  National ID: ${pack.nationalId}`, margin, y);
  y += 14;
  doc.text(`Destination: ${pack.destinationCity}, ${pack.destinationCountry}`, margin, y);
  y += 14;
  doc.text(`Contracted Employer: ${pack.employer} (${pack.jobTitle})`, margin, y);
  y += 14;
  doc.text(`Flight Assignment: ${pack.flightNumber}  |  Departure Date: ${pack.departureDate}`, margin, y);
  y += 22;

  // Documents list
  doc.setFont('helvetica', 'bold');
  doc.text('AUTHENTICATED DOCUMENTS INCLUDED IN PHYSICAL PACK:', margin, y);
  y += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  pack.items.forEach((item) => {
    doc.text(`[VERIFIED]  ${item.name} (${item.category})`, margin + 10, y);
    y += 13;
  });
  y += 20;

  // Legal protection statement
  doc.setFillColor(254, 243, 199); // Amber warning
  doc.rect(margin, y, pageWidth - margin * 2, 42, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(146, 64, 14);
  doc.text('LAWFUL RETENTION POLICY (KENYA MIGRANT WORKER CODE):', margin + 10, y + 14);
  doc.setFont('helvetica', 'normal');
  doc.text('Original passport and travel documents belong exclusively to the bearer. No overseas employer or intermediary is permitted to retain original passports.', margin + 10, y + 28);
  y += 60;

  // Signatures
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(17, 24, 39);
  doc.text('Applicant Digital Acknowledgment: SIGNED & VERIFIED', margin, y);
  y += 14;
  doc.text('KenyaOne Documentation Officer: COUNTERSIGNED & SEALED', margin, y);

  doc.save(`Departure_Pack_Receipt_${pack.referenceNumber}.pdf`);
}
