import { useState } from "react";
import type {
  PartnershipFormData,
  PartnershipFormErrors,
  PartnershipFocusState,
  PartnershipFormStatus,
} from "../types";

export function usePartnershipForm() {
  const [form, setForm] = useState<PartnershipFormData>({ name: "", earnRate: "", pointValueIDR: "" });
  const [errors, setErrors] = useState<PartnershipFormErrors>({});
  const [focused, setFocused] = useState<PartnershipFocusState>({});
  const [status, setStatus] = useState<PartnershipFormStatus>("idle");

  function validate(): PartnershipFormErrors {
    const e: PartnershipFormErrors = {};
    if (!form.name.trim()) e.name = "Merchant name is required";
    if (!form.earnRate) e.earnRate = "Earn rate is required";
    else if (isNaN(Number(form.earnRate)) || Number(form.earnRate) <= 0)
      e.earnRate = "Must be a positive number";
    if (!form.pointValueIDR) e.pointValueIDR = "Point value is required";
    else if (isNaN(Number(form.pointValueIDR)) || Number(form.pointValueIDR) <= 0)
      e.pointValueIDR = "Must be a positive integer";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1800);
  }

  function handleChange(key: keyof PartnershipFormData, val: string) {
    setForm((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  }

  function focus(key: keyof PartnershipFormData) {
    setFocused((p) => ({ ...p, [key]: true }));
  }

  function blur(key: keyof PartnershipFormData) {
    setFocused((p) => ({ ...p, [key]: false }));
  }

  function reset() {
    setStatus("idle");
    setForm({ name: "", earnRate: "", pointValueIDR: "" });
    setErrors({});
  }

  return { form, errors, focused, status, handleSubmit, handleChange, focus, blur, reset };
}
