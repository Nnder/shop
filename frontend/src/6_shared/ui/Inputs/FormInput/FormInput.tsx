import * as React from "react"
import styles from './FormInput.module.css'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, ...props }, ref) => {
    return (
        <div>
            <input type={type} ref={ref} {...props} className={styles.input} placeholder={placeholder}/>
                <span className={styles.highlight}></span>
                <span className={styles.bar}></span>
            <label className={styles.label}>{placeholder}</label>
        </div>
    )
  }
)
FormInput.displayName = "FormInput"

export { FormInput }
