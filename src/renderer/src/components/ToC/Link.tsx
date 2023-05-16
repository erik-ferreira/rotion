import { ReactNode } from "react"

interface ToCLinkProps {
  children: ReactNode
  level: number
}

export function ToCLink({ level, ...props }: ToCLinkProps) {
  function getPadding() {
    switch (level) {
      case 2:
        return "px-2"

      case 3:
        return "px-4"

      case 4:
        return "px-6"

      case 5:
        return "px-8"

      case 6:
        return "px-10"

      default:
        return ""
    }
  }

  return (
    <li className={`hover:text-rotion-50 ${getPadding()}`}>
      <a {...props} />
    </li>
  )
}
