
"use client";

import { motion, Variants } from 'framer-motion';
import React from 'react';

interface AnimatedTextProps {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  wordClassName?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  staggerDelay?: number;
  wordDelay?: number;
}

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  el: Wrapper = 'p',
  className,
  wordClassName,
  highlightWords = [],
  highlightClassName = 'text-primary', // Default highlight class
  staggerDelay = 0.05,
  wordDelay = 0,
}) => {
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: wordDelay * i },
    }),
  };

  const childVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100 },
    },
  };

  return (
    <Wrapper className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label={text}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={childVariants}
            className={`${wordClassName || ''} ${highlightWords.includes(word) ? highlightClassName : ''}`}
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
          >
            {word + (index < words.length - 1 ? ' ' : '')}
          </motion.span>
        ))}
      </motion.span>
    </Wrapper>
  );
};

export default AnimatedText;
