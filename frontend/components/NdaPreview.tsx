'use client'

import { NdaFormData } from '@/lib/types'

interface Props {
  data: NdaFormData
}

function Field({ value, placeholder }: { value: string; placeholder: string }) {
  if (value.trim()) return <span className="font-medium">{value}</span>
  return <span className="text-amber-500 font-medium italic">[{placeholder}]</span>
}

function mndaTermText(data: NdaFormData): string {
  if (data.mndaTermType === 'continues') return 'termination in accordance with the terms of the MNDA'
  const y = data.mndaTermYears
  return `${y} ${y === 1 ? 'year' : 'years'} from Effective Date`
}

function confidentialityTermText(data: NdaFormData): string {
  if (data.confidentialityTermType === 'perpetuity') return 'in perpetuity'
  const y = data.confidentialityTermYears
  return `${y} ${y === 1 ? 'year' : 'years'} from Effective Date`
}

function formatDate(iso: string): string {
  if (!iso) return ''
  const [year, month, day] = iso.split('-')
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function NdaPreview({ data }: Props) {
  const mndaTerm = mndaTermText(data)
  const confTerm = confidentialityTermText(data)
  const effectiveDateFormatted = formatDate(data.effectiveDate)

  return (
    <div className="font-serif text-gray-900 leading-relaxed text-sm">
      {/* Cover Page */}
      <h1 className="text-2xl font-bold text-center mb-2">Mutual Non-Disclosure Agreement</h1>

      <div className="text-xs text-center text-gray-500 mb-6 italic">
        Common Paper Mutual NDA (Version 1.0) — free to use under CC BY 4.0
      </div>

      <p className="mb-6 text-xs leading-relaxed text-gray-600">
        This Mutual Non-Disclosure Agreement (the &ldquo;MNDA&rdquo;) consists of: (1) this Cover Page and (2) the
        Common Paper Mutual NDA Standard Terms Version 1.0 identical to those posted at{' '}
        <span className="text-blue-600">commonpaper.com/standards/mutual-nda/1.0</span>. Any modifications of the
        Standard Terms should be made on the Cover Page, which will control over conflicts with the Standard Terms.
      </p>

      {/* Cover Page Fields */}
      <div className="border border-gray-300 rounded-sm divide-y divide-gray-200 mb-6 text-sm">
        <CoverRow label="Purpose" sublabel="How Confidential Information may be used">
          <Field value={data.purpose} placeholder="Purpose" />
        </CoverRow>
        <CoverRow label="Effective Date">
          <Field value={effectiveDateFormatted} placeholder="Effective Date" />
        </CoverRow>
        <CoverRow label="MNDA Term" sublabel="The length of this MNDA">
          {data.mndaTermType === 'expires' ? (
            <>
              Expires{' '}
              <span className="font-medium">
                {data.mndaTermYears} {data.mndaTermYears === 1 ? 'year' : 'years'}
              </span>{' '}
              from Effective Date
            </>
          ) : (
            'Continues until terminated in accordance with the terms of the MNDA'
          )}
        </CoverRow>
        <CoverRow label="Term of Confidentiality" sublabel="How long Confidential Information is protected">
          {data.confidentialityTermType === 'perpetuity' ? (
            'In perpetuity'
          ) : (
            <>
              <span className="font-medium">
                {data.confidentialityTermYears} {data.confidentialityTermYears === 1 ? 'year' : 'years'}
              </span>{' '}
              from Effective Date, but in the case of trade secrets until Confidential Information is no longer
              considered a trade secret under applicable laws
            </>
          )}
        </CoverRow>
        <CoverRow label="Governing Law & Jurisdiction">
          <div>
            Governing Law:{' '}
            <Field value={data.governingLaw} placeholder="State" />
          </div>
          <div className="mt-1">
            Jurisdiction:{' '}
            <Field value={data.jurisdiction} placeholder="City or county and state" />
          </div>
        </CoverRow>
        <CoverRow label="MNDA Modifications">
          {data.modifications.trim() ? (
            <span className="whitespace-pre-line">{data.modifications}</span>
          ) : (
            <span className="text-gray-400 italic">None</span>
          )}
        </CoverRow>
      </div>

      <p className="text-xs text-gray-600 mb-4">
        By signing this Cover Page, each party agrees to enter into this MNDA as of the Effective Date.
      </p>

      {/* Signature table */}
      <table className="w-full border-collapse border border-gray-300 text-xs mb-8">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-300 px-3 py-2 text-left w-1/3"></th>
            <th className="border border-gray-300 px-3 py-2 text-center">
              <Field value={data.party1.company} placeholder="Party 1" />
            </th>
            <th className="border border-gray-300 px-3 py-2 text-center">
              <Field value={data.party2.company} placeholder="Party 2" />
            </th>
          </tr>
        </thead>
        <tbody>
          <SignatureRow label="Signature" p1="" p2="" isSignature />
          <SignatureRow label="Print Name" p1={data.party1.name} p2={data.party2.name} />
          <SignatureRow label="Title" p1={data.party1.title} p2={data.party2.title} />
          <SignatureRow label="Company" p1={data.party1.company} p2={data.party2.company} />
          <SignatureRow
            label="Notice Address"
            sublabel="Use either email or postal address"
            p1={data.party1.noticeAddress}
            p2={data.party2.noticeAddress}
          />
          <SignatureRow label="Date" p1="" p2="" />
        </tbody>
      </table>

      {/* Standard Terms */}
      <div className="border-t border-gray-300 pt-6">
        <h2 className="text-lg font-bold text-center mb-4">Standard Terms</h2>

        <ol className="space-y-4 list-none pl-0">
          <li>
            <span className="font-bold">1. Introduction.</span> This Mutual Non-Disclosure Agreement (which incorporates
            these Standard Terms and the Cover Page) (&ldquo;MNDA&rdquo;) allows each party (&ldquo;Disclosing
            Party&rdquo;) to disclose or make available information in connection with the{' '}
            <Field value={data.purpose} placeholder="Purpose" /> which (1) the Disclosing Party identifies to the
            receiving party (&ldquo;Receiving Party&rdquo;) as &ldquo;confidential&rdquo;, &ldquo;proprietary&rdquo;,
            or the like or (2) should be reasonably understood as confidential or proprietary due to its nature and
            the circumstances of its disclosure (&ldquo;Confidential Information&rdquo;). Each party&apos;s
            Confidential Information also includes the existence and status of the parties&apos; discussions and
            information on the Cover Page. Confidential Information includes technical or business information,
            product designs or roadmaps, requirements, pricing, security and compliance documentation, technology,
            inventions and know-how. To use this MNDA, the parties must complete and sign a cover page incorporating
            these Standard Terms (&ldquo;Cover Page&rdquo;). Each party is identified on the Cover Page and
            capitalized terms have the meanings given herein or on the Cover Page.
          </li>

          <li>
            <span className="font-bold">2. Use and Protection of Confidential Information.</span> The Receiving Party
            shall: (a) use Confidential Information solely for the{' '}
            <Field value={data.purpose} placeholder="Purpose" />; (b) not disclose Confidential Information to third
            parties without the Disclosing Party&apos;s prior written approval, except that the Receiving Party may
            disclose Confidential Information to its employees, agents, advisors, contractors and other
            representatives having a reasonable need to know for the{' '}
            <Field value={data.purpose} placeholder="Purpose" />, provided these representatives are bound by
            confidentiality obligations no less protective of the Disclosing Party than the applicable terms in this
            MNDA and the Receiving Party remains responsible for their compliance with this MNDA; and (c) protect
            Confidential Information using at least the same protections the Receiving Party uses for its own similar
            information but no less than a reasonable standard of care.
          </li>

          <li>
            <span className="font-bold">3. Exceptions.</span> The Receiving Party&apos;s obligations in this MNDA do
            not apply to information that it can demonstrate: (a) is or becomes publicly available through no fault
            of the Receiving Party; (b) it rightfully knew or possessed prior to receipt from the Disclosing Party
            without confidentiality restrictions; (c) it rightfully obtained from a third party without
            confidentiality restrictions; or (d) it independently developed without using or referencing the
            Confidential Information.
          </li>

          <li>
            <span className="font-bold">4. Disclosures Required by Law.</span> The Receiving Party may disclose
            Confidential Information to the extent required by law, regulation or regulatory authority, subpoena or
            court order, provided (to the extent legally permitted) it provides the Disclosing Party reasonable
            advance notice of the required disclosure and reasonably cooperates, at the Disclosing Party&apos;s
            expense, with the Disclosing Party&apos;s efforts to obtain confidential treatment for the Confidential
            Information.
          </li>

          <li>
            <span className="font-bold">5. Term and Termination.</span> This MNDA commences on the{' '}
            <Field value={effectiveDateFormatted} placeholder="Effective Date" /> and expires at the end of the{' '}
            <span className="font-medium">{mndaTerm}</span>. Either party may terminate this MNDA for any or no
            reason upon written notice to the other party. The Receiving Party&apos;s obligations relating to
            Confidential Information will survive for the{' '}
            <span className="font-medium">{confTerm}</span>, despite any expiration or termination of this MNDA.
          </li>

          <li>
            <span className="font-bold">6. Return or Destruction of Confidential Information.</span> Upon expiration
            or termination of this MNDA or upon the Disclosing Party&apos;s earlier request, the Receiving Party
            will: (a) cease using Confidential Information; (b) promptly after the Disclosing Party&apos;s written
            request, destroy all Confidential Information in the Receiving Party&apos;s possession or control or
            return it to the Disclosing Party; and (c) if requested by the Disclosing Party, confirm its compliance
            with these obligations in writing. As an exception to subsection (b), the Receiving Party may retain
            Confidential Information in accordance with its standard backup or record retention policies or as
            required by law, but the terms of this MNDA will continue to apply to the retained Confidential
            Information.
          </li>

          <li>
            <span className="font-bold">7. Proprietary Rights.</span> The Disclosing Party retains all of its
            intellectual property and other rights in its Confidential Information and its disclosure to the
            Receiving Party grants no license under such rights.
          </li>

          <li>
            <span className="font-bold">8. Disclaimer.</span> ALL CONFIDENTIAL INFORMATION IS PROVIDED
            &ldquo;AS IS&rdquo;, WITH ALL FAULTS, AND WITHOUT WARRANTIES, INCLUDING THE IMPLIED WARRANTIES OF
            TITLE, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
          </li>

          <li>
            <span className="font-bold">9. Governing Law and Jurisdiction.</span> This MNDA and all matters relating
            hereto are governed by, and construed in accordance with, the laws of the State of{' '}
            <Field value={data.governingLaw} placeholder="Governing Law" />, without regard to the conflict of laws
            provisions of such <Field value={data.governingLaw} placeholder="Governing Law" />. Any legal suit,
            action, or proceeding relating to this MNDA must be instituted in the federal or state courts located in{' '}
            <Field value={data.jurisdiction} placeholder="Jurisdiction" />. Each party irrevocably submits to the
            exclusive jurisdiction of such{' '}
            <Field value={data.jurisdiction} placeholder="Jurisdiction" /> in any such suit, action, or proceeding.
          </li>

          <li>
            <span className="font-bold">10. Equitable Relief.</span> A breach of this MNDA may cause irreparable
            harm for which monetary damages are an insufficient remedy. Upon a breach of this MNDA, the Disclosing
            Party is entitled to seek appropriate equitable relief, including an injunction, in addition to its
            other remedies.
          </li>

          <li>
            <span className="font-bold">11. General.</span> Neither party has an obligation under this MNDA to
            disclose Confidential Information to the other or proceed with any proposed transaction. Neither party
            may assign this MNDA without the prior written consent of the other party, except that either party may
            assign this MNDA in connection with a merger, reorganization, acquisition or other transfer of all or
            substantially all its assets or voting securities. Any assignment in violation of this Section is null
            and void. This MNDA will bind and inure to the benefit of each party&apos;s permitted successors and
            assigns. Waivers must be signed by the waiving party&apos;s authorized representative and cannot be
            implied from conduct. If any provision of this MNDA is held unenforceable, it will be limited to the
            minimum extent necessary so the rest of this MNDA remains in effect. This MNDA (including the Cover
            Page) constitutes the entire agreement of the parties with respect to its subject matter, and supersedes
            all prior and contemporaneous understandings, agreements, representations, and warranties, whether
            written or oral, regarding such subject matter. This MNDA may only be amended, modified, waived, or
            supplemented by an agreement in writing signed by both parties. Notices, requests and approvals under
            this MNDA must be sent in writing to the email or postal addresses on the Cover Page and are deemed
            delivered on receipt. This MNDA may be executed in counterparts, including electronic copies, each of
            which is deemed an original and which together form the same agreement.
          </li>
        </ol>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Common Paper Mutual Non-Disclosure Agreement Version 1.0 free to use under CC BY 4.0
        </p>
      </div>
    </div>
  )
}

function CoverRow({
  label,
  sublabel,
  children,
}: {
  label: string
  sublabel?: string
  children: React.ReactNode
}) {
  return (
    <div className="px-4 py-3">
      <div className="text-xs font-semibold text-gray-700 mb-1">
        {label}
        {sublabel && <span className="ml-2 text-gray-400 font-normal italic">{sublabel}</span>}
      </div>
      <div className="text-sm text-gray-800">{children}</div>
    </div>
  )
}

function SignatureRow({
  label,
  sublabel,
  p1,
  p2,
  isSignature,
}: {
  label: string
  sublabel?: string
  p1: string
  p2: string
  isSignature?: boolean
}) {
  return (
    <tr>
      <td className="border border-gray-300 px-3 py-2 font-medium text-gray-700">
        {label}
        {sublabel && <div className="text-gray-400 font-normal text-xs italic">{sublabel}</div>}
      </td>
      <td className="border border-gray-300 px-3 py-2 text-center">
        {isSignature ? (
          <span className="text-gray-300 text-xs italic">_______________</span>
        ) : (
          <span className="text-gray-700">{p1}</span>
        )}
      </td>
      <td className="border border-gray-300 px-3 py-2 text-center">
        {isSignature ? (
          <span className="text-gray-300 text-xs italic">_______________</span>
        ) : (
          <span className="text-gray-700">{p2}</span>
        )}
      </td>
    </tr>
  )
}
