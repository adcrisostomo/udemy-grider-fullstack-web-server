// contains logic to render a single...
// ...label and text input
import React from 'react'

export default ({
    input,
    label,  // this function automatically looks for input prop of props
    meta: { error, touched } // ES6 syntax; take only error and touched
}) => {
    return (
        <div>
            <label>{ label }</label>
            <input { ...input } style={{ marginBottom: '5px' }}/>
            <div className='red-text' style={{ marginBottom: '20px' }}>
                { touched && error }
            </div>
        </div>
    )
}