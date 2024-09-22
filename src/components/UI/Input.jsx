import classes from './Input.module.css';

export default function Input({type, name, label, ...props}){
    return(
        <div className={classes.input_block}>
            <label 
                htmlFor={name}
                className={classes.label}
            >
                {label}
            </label>

            {(type === 'textarea') ?
                <textarea  
                    name={name}
                    className={classes.textarea}
                    {...props}
                />
                :
                <input 
                type={type} 
                name={name} 
                className={classes.input}
                {...props}
                />
            }
           

        </div>
    )
}