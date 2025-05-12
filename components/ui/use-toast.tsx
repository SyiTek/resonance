"use client"

import { useToast as useToastHook, toast } from "sonner"
import type { ToastProps, ToastActionElement } from "./toast"

export function useToast() {
  return useToastHook<ToastProps, ToastActionElement>()
}

export { toast }