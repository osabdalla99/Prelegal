'use client'

import { NdaFormData, Party } from '@/lib/types'

interface Props {
  data: NdaFormData
  onChange: (data: NdaFormData) => void
}

const inputClass =
  'block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
const labelClass = 'block text-sm font-medium text-gray-700 mb-1'
const sectionClass = 'mb-7'
const sectionTitleClass = 'text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 pb-1 border-b border-gray-200'

export default function NdaForm({ data, onChange }: Props) {
  const set = (patch: Partial<NdaFormData>) => onChange({ ...data, ...patch })
  const setParty1 = (patch: Partial<Party>) => set({ party1: { ...data.party1, ...patch } })
  const setParty2 = (patch: Partial<Party>) => set({ party2: { ...data.party2, ...patch } })

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-0">
      {/* Purpose */}
      <div className={sectionClass}>
        <div className={sectionTitleClass}>Agreement Details</div>
        <div className="mb-4">
          <label className={labelClass}>
            Purpose
            <span className="ml-1 text-xs text-gray-400 font-normal">How confidential information may be used</span>
          </label>
          <textarea
            rows={3}
            className={inputClass}
            value={data.purpose}
            onChange={(e) => set({ purpose: e.target.value })}
            placeholder="e.g. Evaluating whether to enter into a business relationship with the other party."
          />
        </div>
        <div>
          <label className={labelClass}>Effective Date</label>
          <input
            type="date"
            className={inputClass}
            value={data.effectiveDate}
            onChange={(e) => set({ effectiveDate: e.target.value })}
          />
        </div>
      </div>

      {/* MNDA Term */}
      <div className={sectionClass}>
        <div className={sectionTitleClass}>MNDA Term</div>
        <div className="space-y-2 mb-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="mndaTermType"
              value="expires"
              checked={data.mndaTermType === 'expires'}
              onChange={() => set({ mndaTermType: 'expires' })}
              className="text-blue-600"
            />
            <span className="text-sm text-gray-700">Expires from Effective Date</span>
          </label>
          {data.mndaTermType === 'expires' && (
            <div className="ml-6 flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={10}
                className="w-20 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.mndaTermYears}
                onChange={(e) => set({ mndaTermYears: Math.max(1, parseInt(e.target.value) || 1) })}
              />
              <span className="text-sm text-gray-600">year(s)</span>
            </div>
          )}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="mndaTermType"
              value="continues"
              checked={data.mndaTermType === 'continues'}
              onChange={() => set({ mndaTermType: 'continues' })}
              className="text-blue-600"
            />
            <span className="text-sm text-gray-700">Continues until terminated</span>
          </label>
        </div>
      </div>

      {/* Term of Confidentiality */}
      <div className={sectionClass}>
        <div className={sectionTitleClass}>Term of Confidentiality</div>
        <div className="space-y-2 mb-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="confidentialityTermType"
              value="years"
              checked={data.confidentialityTermType === 'years'}
              onChange={() => set({ confidentialityTermType: 'years' })}
              className="text-blue-600"
            />
            <span className="text-sm text-gray-700">From Effective Date</span>
          </label>
          {data.confidentialityTermType === 'years' && (
            <div className="ml-6 flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={10}
                className="w-20 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data.confidentialityTermYears}
                onChange={(e) => set({ confidentialityTermYears: Math.max(1, parseInt(e.target.value) || 1) })}
              />
              <span className="text-sm text-gray-600">year(s)</span>
            </div>
          )}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="confidentialityTermType"
              value="perpetuity"
              checked={data.confidentialityTermType === 'perpetuity'}
              onChange={() => set({ confidentialityTermType: 'perpetuity' })}
              className="text-blue-600"
            />
            <span className="text-sm text-gray-700">In perpetuity</span>
          </label>
        </div>
      </div>

      {/* Legal */}
      <div className={sectionClass}>
        <div className={sectionTitleClass}>Governing Law & Jurisdiction</div>
        <div className="mb-4">
          <label className={labelClass}>Governing Law (State)</label>
          <input
            type="text"
            className={inputClass}
            value={data.governingLaw}
            onChange={(e) => set({ governingLaw: e.target.value })}
            placeholder="e.g. Delaware"
          />
        </div>
        <div>
          <label className={labelClass}>Jurisdiction</label>
          <input
            type="text"
            className={inputClass}
            value={data.jurisdiction}
            onChange={(e) => set({ jurisdiction: e.target.value })}
            placeholder="e.g. courts located in New Castle, DE"
          />
        </div>
      </div>

      {/* Party 1 */}
      <div className={sectionClass}>
        <div className={sectionTitleClass}>Party 1</div>
        <PartyFields party={data.party1} onChange={setParty1} />
      </div>

      {/* Party 2 */}
      <div className={sectionClass}>
        <div className={sectionTitleClass}>Party 2</div>
        <PartyFields party={data.party2} onChange={setParty2} />
      </div>

      {/* Modifications */}
      <div className={sectionClass}>
        <div className={sectionTitleClass}>MNDA Modifications</div>
        <textarea
          rows={4}
          className={inputClass}
          value={data.modifications}
          onChange={(e) => set({ modifications: e.target.value })}
          placeholder="List any modifications to the standard MNDA terms, or leave blank."
        />
      </div>
    </form>
  )
}

function PartyFields({ party, onChange }: { party: Party; onChange: (p: Partial<Party>) => void }) {
  const inputClass =
    'block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <div className="space-y-3">
      <div>
        <label className={labelClass}>Print Name</label>
        <input
          type="text"
          className={inputClass}
          value={party.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Full name"
        />
      </div>
      <div>
        <label className={labelClass}>Title</label>
        <input
          type="text"
          className={inputClass}
          value={party.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="e.g. CEO"
        />
      </div>
      <div>
        <label className={labelClass}>Company</label>
        <input
          type="text"
          className={inputClass}
          value={party.company}
          onChange={(e) => onChange({ company: e.target.value })}
          placeholder="Company name"
        />
      </div>
      <div>
        <label className={labelClass}>Notice Address</label>
        <textarea
          rows={2}
          className={inputClass}
          value={party.noticeAddress}
          onChange={(e) => onChange({ noticeAddress: e.target.value })}
          placeholder="Email or postal address"
        />
      </div>
    </div>
  )
}
