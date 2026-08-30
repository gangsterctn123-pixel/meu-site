import {
  BuildingStorefrontIcon,
  GlobeAltIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType } from "react";
import { serviceOptions, type ServiceOption } from "../data/content";
import { Reveal } from "./Reveal";

const icons: Record<ServiceOption["icon"], ComponentType<{ className?: string }>> = {
  online: GlobeAltIcon,
  "dine-in": BuildingStorefrontIcon,
  takeaway: ShoppingBagIcon,
  delivery: TruckIcon,
};

export function ServiceOptions() {
  return (
    <section className="border-b border-black/5 bg-cream py-8">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-4 px-4 sm:grid-cols-4">
        {serviceOptions.map((option, i) => {
          const Icon = icons[option.icon];
          return (
            <Reveal key={option.label} delay={i * 60}>
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-black/5 bg-white px-4 py-5 text-center shadow-card">
                <Icon className="h-7 w-7 text-fire" />
                <span className="text-sm font-semibold text-ink">{option.label}</span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
