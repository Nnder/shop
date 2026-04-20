import * as React from "react"
import styles from './FormInput.module.css'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> {
    multiline?: boolean;
    rows?: number;
  }

const FormInput = React.forwardRef<HTMLInputElement & HTMLTextAreaElement, InputProps>(
  ({ className, type, placeholder, multiline, ...props }, ref) => {
    return (
        <div className={styles.wrapper}>
            {multiline ? (
                <textarea 
                    ref={ref as any} 
                    {...props as any} 
                    className={styles.input} 
                    placeholder={placeholder || " "} 
                />
            ) : (
                <input 
                    type={type} 
                    ref={ref as any} 
                    {...props} 
                    className={styles.input} 
                    placeholder={placeholder || " "}
                />
            )}
            <label className={styles.label}>{placeholder}</label>
        </div>
    )
  }
)
FormInput.displayName = "FormInput"

export { FormInput }
