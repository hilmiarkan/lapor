const Form = ({title, children, onSubmit}) => (
  <form onSubmit={onSubmit}>
    <h4 className="my-3 text-center">{title}</h4>
    {children}
  </form>
)

const Input = ({name, type = "text", placeholder, required =false, onChange}) => (
  <div className="form-group">
    <input className="form-control" name={name} type={type} placeholder={placeholder} required={required} onChange={onChange}/>
  </div>
)

export {Form, Input}
