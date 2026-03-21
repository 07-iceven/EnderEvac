"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Language, translations } from "@/lib/translations"
import { CheckCircle2, Clock, ServerOff, Construction, Github, MessageSquare, Power, Loader2, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface EvacuationProgressProps {
  language: Language
  currentStep: number // 0 to 6
  evacuationTime?: number // seconds elapsed since evacuation started
}

export function EvacuationProgress({ language, currentStep }: EvacuationProgressProps) {
  const t = translations[language]

  const steps = [
    { key: 'waiting', icon: Clock },
    { key: 'closing', icon: ServerOff },
    { key: 'maintenance', icon: Construction },
    { key: 'uploading', icon: Github },
    { key: 'notifying', icon: MessageSquare },
    { key: 'facade_shutdown', icon: EyeOff },
    { key: 'shutdown', icon: Power },
  ]

  return (
    <Card className="fluent-glass h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          {t.evacuationTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center px-8 pb-8 pt-4">
        <div className="relative space-y-8 before:absolute before:inset-0 before:left-[19px] before:h-full before:w-px before:bg-border">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isCompleted = index < currentStep
            const isActive = index === currentStep
            const isUpcoming = index > currentStep
            const stepData = (t.steps as any)[step.key]

            return (
              <div key={step.key} className="relative flex gap-6 group">
                <div className={cn(
                  "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background transition-all duration-500",
                  isCompleted && "border-primary bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.5)]",
                  isActive && "border-primary ring-4 ring-primary/20 animate-pulse",
                  isUpcoming && "border-muted text-muted-foreground"
                )}>
                  {isCompleted ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : isActive ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <h3 className={cn(
                    "text-sm font-bold transition-colors",
                    isActive ? "text-primary" : isUpcoming ? "text-muted-foreground" : "text-foreground"
                  )}>
                    {stepData.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stepData.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
