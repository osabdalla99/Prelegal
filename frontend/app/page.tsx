'use client'

import { useState, useEffect } from 'react'
import NdaForm from '@/components/NdaForm'
import NdaPreview from '@/components/NdaPreview'
import { NdaFormData } from '@/lib/types'

const baseData: Omit<NdaFormData, 'effectiveDate'> = {
  purpose: 'Evaluating whether to enter into a business relationship with the other party.',
  mndaTermType: 'expires',
  mndaTermYears: 1,
  confidentialityTermType: 'years',
  confidentialityTermYears: 1,
  governingLaw: '',
  jurisdiction: '',
  modifications: '',
  party1: { name: '', title: '', company: '', noticeAddress: '' },
  party2: { name: '', title: '', company: '', noticeAddress: '' },
}

export default function Home() {
  const [data, setData] = useState<NdaFormData>({ ...baseData, effectiveDate: '' })

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      effectiveDate: new Date().toISOString().split('T')[0],
    }))
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Form panel */}
      <aside className="w-2/5 min-w-64 border-r border-gray-200 bg-white overflow-y-auto print:hidden flex-shrink-0">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900">Mutual NDA Creator</h1>
            <p className="text-xs text-gray-500 mt-1">Fill in the details to generate your agreement</p>
          </div>
          <NdaForm data={data} onChange={setData} />
        </div>
      </aside>

      {/* Preview panel */}
      <main className="flex-1 overflow-y-auto print:overflow-visible">
        <div className="max-w-2xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-4 print:hidden">
            <span className="text-sm text-gray-500">Live preview</span>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors"
            >
              Download PDF
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm print:shadow-none print:border-0 print:rounded-none print:p-0">
            <NdaPreview data={data} />
          </div>
        </div>
      </main>
    </div>
  )
}
