import { cn } from "@/lib/utils"

type BadgeVariant =
    | 'default'
    | 'secondary'
    | 'outline'
    | 'success'
    | 'warning'
    | 'danger'
type statusTypes = "backlog" | "todo" | "in_progress" | "done"
type priorityTypes = "low" | "medium" | "high"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant,
    status?: statusTypes,
    priority?: priorityTypes,
    size: "sm" | "md" | "lg"
}

const Badge: React.FC<BadgeProps> = ({ size, variant, status, priority, children, className, ...props }) => {
    const getBadgeVariant = (): BadgeVariant => {
        if (status) {
            switch (status) {
                case 'backlog':
                    return 'secondary'
                case 'todo':
                    return 'default'
                case 'in_progress':
                    return 'warning'
                case 'done':
                    return 'success'
                default:
                    return 'default'
            }
        }

        if (priority) {
            switch (priority) {
                case 'low':
                    return 'secondary'
                case 'medium':
                    return 'default'
                case 'high':
                    return 'danger'
                default:
                    return 'default'
            }
        }

        return variant || "default"
    }

    const baseStyles = 'inline-flex items-center font-medium rounded-full'

    const sizeStyles = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm'
    }

    const variantStyles = {
        default: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
        secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        outline: 'border border-gray-200 text-gray-800 dark:border-gray-600 dark:text-gray-300',
        success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    }

    const badgeVariant = getBadgeVariant()

    return (
        <span
            className={cn(baseStyles,sizeStyles[size],variantStyles[badgeVariant],className)}
            {...props}
        >
            {children}
        </span>
    )
}

export default Badge