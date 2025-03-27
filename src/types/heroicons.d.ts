// src/types/heroicons.d.ts

declare module '@heroicons/react/solid' {
    import { ComponentType, SVGProps } from 'react';
  
    export const HomeIcon: ComponentType<SVGProps<SVGSVGElement>>;
    export const UserIcon: ComponentType<SVGProps<SVGSVGElement>>;
    export const ArrowLeftIcon: ComponentType<SVGProps<SVGSVGElement>>;
    export const ArrowRightIcon: ComponentType<SVGProps<SVGSVGElement>>;
    export const PlusIcon: ComponentType<SVGProps<SVGSVGElement>>;
    export const XIcon: ComponentType<SVGProps<SVGSVGElement>>;
    // Add more icons as needed or use "any" for general use:
    export const AnyIcon: ComponentType<SVGProps<SVGSVGElement>>;
  }
  
  declare module '@heroicons/react/outline' {
    import { ComponentType, SVGProps } from 'react';
    export const HomeIcon: ComponentType<SVGProps<SVGSVGElement>>;
    export const SearchIcon: ComponentType<SVGProps<SVGSVGElement>>;
    export const UserCircleIcon: ComponentType<SVGProps<SVGSVGElement>>;
    export const BellIcon: ComponentType<SVGProps<SVGSVGElement>>;
    export const CogIcon: ComponentType<SVGProps<SVGSVGElement>>;
    export const AnyIcon: ComponentType<SVGProps<SVGSVGElement>>;
  }
  