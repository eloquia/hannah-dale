import { motion } from "framer-motion";

export type AnimatedTextProps = {
  text: string;
}

const AnimatedText = (props: AnimatedTextProps) => {
  return (
    <motion.div className="text">
      {props.text.split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: index * 0.1 }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
export default AnimatedText;
