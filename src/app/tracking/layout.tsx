import { AuthProvider } from "@/components/AuthProvider"
import HeaderWithProvider from "@/components/tracking/HeaderProvider" 

export default function TrackingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <HeaderWithProvider />
      {children}
    </AuthProvider>
  )
}