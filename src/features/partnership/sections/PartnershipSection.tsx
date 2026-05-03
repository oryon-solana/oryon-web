"use client";

import { usePartnershipForm } from "../hooks/usePartnershipForm";
import { useMerchants } from "../hooks/useMerchants";
import PartnershipHero from "./PartnershipHero";
import ApplicationForm from "../components/ApplicationForm";
import SuccessCard from "../components/SuccessCard";

export default function PartnershipSection() {
  const f = usePartnershipForm();
  const { merchants, loading: loadingMerchants } = useMerchants();

  if (f.status === "success") {
    return <SuccessCard form={f.form} onReset={f.reset} />;
  }

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 max-w-[1100px] mx-auto px-8 pt-16 pb-24 gap-16 items-start relative z-[1]"
    >
      <PartnershipHero merchantCount={merchants.length} loadingCount={loadingMerchants} />
      <ApplicationForm
        form={f.form}
        errors={f.errors}
        focused={f.focused}
        status={f.status}
        txError={f.txError}
        isConnected={f.isConnected}
        onChange={f.handleChange}
        onFocus={f.focus}
        onBlur={f.blur}
        onSubmit={f.handleSubmit}
      />
    </div>
  );
}
