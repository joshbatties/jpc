// app/tracking/layout.tsx

import HeaderProvider from '../../components/tracking/HeaderProvider'

export default function TrackingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HeaderProvider />
      {children}
    </>
  )
}