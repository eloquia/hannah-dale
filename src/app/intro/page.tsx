"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const key = usePathname();

  const variants = {
    hidden: { opacity: 0, x: "-100%", zIndex: -1 },
    visible: { opacity: 1, x: 0, zIndex: 1 },
    exit: { opacity: 0, x: "100%" },
  };

  const nextPage = () => {
    router.push('/chapter-1');
  }

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={key}
        className="min-h-screen w-screen flex items-center justify-center bg-slate-200"
        initial="hidden"
        animate="visible"
        exit={{ opacity: 1, x: 0, zIndex: 1, rotateY: 180 }}
        transition={{ duration: 0.7 }}
        variants={variants}
        style={{ position: "absolute" }}
        onClick={nextPage}
      >
        <h1 className="text-slate-900">Intro</h1>
      </motion.div>
    </AnimatePresence>
  );
};

export default Page;
