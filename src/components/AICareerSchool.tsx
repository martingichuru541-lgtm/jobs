import React, { useState } from 'react';
import { AICourse } from '../types';
import { AI_COURSES } from '../data/expandedData';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Award,
  Play,
  Clock,
  Star,
  Users,
  Check,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface AICareerSchoolProps {
  candidateName: string;
}

export const AICareerSchool: React.FC<AICareerSchoolProps> = ({ candidateName }) => {
  const [courses, setCourses] = useState<AICourse[]>(AI_COURSES);
  const [activeCourse, setActiveCourse] = useState<AICourse>(AI_COURSES[0]);
  const [activeQuizCourse, setActiveQuizCourse] = useState<AICourse | null>(null);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [passedCert, setPassedCert] = useState<string | null>(null);

  const handleStartQuiz = (course: AICourse) => {
    setActiveQuizCourse(course);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    if (!activeQuizCourse) return;
    setQuizSubmitted(true);
    const correctCount = activeQuizCourse.quizQuestions.filter(
      (q, idx) => quizAnswers[idx] === q.correctIndex
    ).length;

    if (correctCount >= 2) {
      setPassedCert(activeQuizCourse.id);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 bg-gradient-to-r from-slate-900/95 via-slate-900 to-emerald-950/40 relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>KenyaOne AI Career School • Chuo cha Mafunzo ya Kimataifa</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Accelerated Certifications & Relocation Readiness
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Gain verified credentials in GCC labour laws, the Wage Protection System, ATS CV optimization, and high-stakes STAR behavioral interviews to unlock fast-track visa sponsorship.
          </p>
        </div>
      </div>

      {/* Main Grid: Course List & Course Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Course Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
            Available Micro-Credentials ({courses.length})
          </span>
          {courses.map((course) => {
            const isCompleted = passedCert === course.id;
            return (
              <div
                key={course.id}
                onClick={() => setActiveCourse(course)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  activeCourse.id === course.id
                    ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                    : 'glass-panel border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                    {course.category}
                  </span>
                  {isCompleted && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-500 text-slate-950 flex items-center gap-1">
                      <Award className="w-3 h-3" /> Certified
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-white text-sm leading-snug">{course.title}</h3>
                <p className="text-xs text-slate-400">{course.provider}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" /> {course.rating}
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <Users className="w-3 h-3" /> {course.enrolledCount.toLocaleString()} Alumni
                  </span>
                  <span className="text-emerald-400 font-bold">{course.durationWeeks} Weeks</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Course View & Curriculum (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-5 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Course Syllabus & Assessment
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">{activeCourse.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Authored by {activeCourse.provider}. Interactive micro-modules with terminal knowledge check quiz.
              </p>
            </div>

            {/* Modules List */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Modules in this Curriculum ({activeCourse.modules.length})
              </span>
              <div className="space-y-2.5">
                {activeCourse.modules.map((m, idx) => (
                  <div
                    key={m.id}
                    className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[11px]">
                        {idx + 1}
                      </div>
                      <span className="font-semibold text-slate-200">{m.title}</span>
                    </div>
                    <span className="text-slate-400 text-[11px] font-mono">{m.durationMinutes} mins</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment Trigger */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">Terminal Certification Exam</h4>
                <p className="text-xs text-slate-300">
                  Answer 3 realistic scenario questions. Score 66%+ to issue verifiable badge.
                </p>
              </div>
              <button
                onClick={() => handleStartQuiz(activeCourse)}
                className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-2 cursor-pointer shadow-md transition-all self-start sm:self-auto"
              >
                <Award className="w-4 h-4" />
                <span>Take Knowledge Check Quiz</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Assessment Modal */}
      {activeQuizCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="glass-panel max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-emerald-500/40 space-y-6 my-8 animate-scaleUp">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  Knowledge Check Quiz
                </span>
                <h3 className="text-lg font-black text-white mt-1">{activeQuizCourse.title}</h3>
              </div>
              <button
                onClick={() => setActiveQuizCourse(null)}
                className="text-slate-400 hover:text-white text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {activeQuizCourse.quizQuestions.map((q, qIdx) => (
                <div key={qIdx} className="space-y-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <p className="text-xs sm:text-sm font-bold text-white">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[qIdx] === optIdx;
                      const isCorrect = q.correctIndex === optIdx;
                      let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                      if (isSelected) {
                        btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold';
                      }
                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-900/50 border-emerald-500 text-emerald-200 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-950/50 border-rose-500 text-rose-300';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(qIdx, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <div className="text-[11px] text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <span className="font-bold text-emerald-400">Explanation:</span> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quiz Result / Action */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              {!quizSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(quizAnswers).length < activeQuizCourse.quizQuestions.length}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-black bg-emerald-500 text-slate-950 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Grade My Assessment
                </button>
              ) : (
                <div className="w-full space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 text-center space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 block">
                      Assessment Result
                    </span>
                    <h4 className="text-lg font-black text-white">
                      {passedCert === activeQuizCourse.id
                        ? 'Congratulations! You Have Passed the Examination!'
                        : 'Review the explanations above and attempt again.'}
                    </h4>
                  </div>

                  {passedCert === activeQuizCourse.id && (
                    <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 to-slate-950 border-2 border-emerald-500/60 text-center space-y-2 shadow-xl">
                      <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
                      <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest block">
                        Verified Digital Certificate
                      </span>
                      <h3 className="text-base font-black text-white">{activeQuizCourse.title}</h3>
                      <p className="text-xs text-slate-300">Awarded to: <strong className="text-white">{candidateName}</strong></p>
                      <span className="text-[10px] font-mono text-emerald-400 block">ID: K1-CERT-{Date.now().toString().slice(-6)}</span>
                    </div>
                  )}

                  <button
                    onClick={() => setActiveQuizCourse(null)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 cursor-pointer"
                  >
                    Return to School
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
