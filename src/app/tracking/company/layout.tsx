import { AuthProvider } from "@/components/AuthProvider"

export default function CompanyTrackingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}