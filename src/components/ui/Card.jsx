// ✅ ALL FUNCTIONAL COMPONENTS - No classes anywhere
export const Card = ({ children, className = "", ...props }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-6 pb-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardTitle = ({ children, className = "", ...props }) => {
  return (
    <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
      {children}
    </h3>
  )
}

export const CardDescription = ({ children, className = "", ...props }) => {
  return (
    <p className={`text-sm text-gray-600 mt-1.5 ${className}`} {...props}>
      {children}
    </p>
  )
}

export const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
}
