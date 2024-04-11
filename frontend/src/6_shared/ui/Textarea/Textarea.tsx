import * as React from "react"
import styles from './Textarea.module.css'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const FormTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, placeholder, ...props }, ref) => {
    return (
        <div>
            <textarea ref={ref} {...props} className={styles.textarea} placeholder={placeholder}></textarea>
                <span className={styles.highlight}></span>
                <span className={styles.bar}></span>
        </div>
    )
  }
)
FormTextarea.displayName = "FormTextarea"

export { FormTextarea }
