'use client';

import { useEffect } from 'react'
import { useTracking } from '@/hooks/useTracking'
import type { TrackingParams } from '../../lib/types/api'
import CompanyResults from './CompanyResults'
import LoadingSpinner from '../LoadingSpinner'
import { AlertTriangle } from 'lucide-react'

interface CompanyResultsClientProps {
  customerCode: string
}

export function CompanyResultsClient({ customerCode }: CompanyResultsClientProps) {
  const { data, error, loading, searchTracking } = useTracking()

  useEffect(() => {
    if (customerCode) {
      const params: TrackingParams = { companyCode: customerCode }
      searchTracking(params)
    }
  }, [customerCode, searchTracking])

  if (loading) {
    return (
      <div className="w-full flex justify-center py-16">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full flex justify-center py-16">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-lg w-full">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-red-50 p-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">
                Unable to Load Shipments
              </h3>
              <p className="text-gray-500 text-sm">
                {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
      <CompanyResults data={data} customerCode={customerCode} />
    </div>
  )
}