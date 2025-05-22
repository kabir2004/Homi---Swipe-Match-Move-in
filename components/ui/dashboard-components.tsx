"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { WifiIcon, Briefcase, Shield, TvIcon, LayoutGridIcon, ListIcon, DropletsIcon } from "lucide-react"

export function Car(props: React.SVGProps<SVGSVGElement>) {
  return <Briefcase {...props} />
}

export function Wifi(props: React.SVGProps<SVGSVGElement>) {
  return <WifiIcon {...props} />
}

export function Droplets(props: React.SVGProps<SVGSVGElement>) {
  return <DropletsIcon {...props} />
}

export function ShieldCheck(props: React.SVGProps<SVGSVGElement>) {
  return <Shield {...props} />
}

export function Tv(props: React.SVGProps<SVGSVGElement>) {
  return <TvIcon {...props} />
}

export function LayoutGrid(props: React.SVGProps<SVGSVGElement>) {
  return <LayoutGridIcon {...props} />
}

export function List(props: React.SVGProps<SVGSVGElement>) {
  return <ListIcon {...props} />
}

export function Checkbox({ id, checked, onChange }: { id: string; checked?: boolean; onChange?: () => void }) {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
    />
  )
}

export function RadioGroup({ defaultValue, children }: { defaultValue: string; children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>
}

export function RadioGroupItem({
  value,
  id,
  name,
  defaultChecked,
}: { value: string; id: string; name?: string; defaultChecked?: boolean }) {
  return (
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      defaultChecked={defaultChecked}
      className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
    />
  )
}

export function Textarea({ id, placeholder, className }: { id: string; placeholder: string; className?: string }) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    />
  )
}

export function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block"
    >
      {children}
    </label>
  )
}
