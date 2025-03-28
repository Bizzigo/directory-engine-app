
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import VendorInfoBadges from '@/components/vendor/VendorInfoBadges';
import { Vendor } from '@/lib/types';
import { placeholderImage } from '@/lib/mockData';

interface VendorHeaderProps {
  vendor: Vendor;
  registrationNumber: string;
  registrationDate: string;
  reviewCount: number;
  hasLursoftProfile: boolean;
  jobVacancies: number;
  hasShop: boolean;
  onRatingClick: () => void;
}

const VendorHeader: React.FC<VendorHeaderProps> = ({
  vendor,
  registrationNumber,
  registrationDate,
  reviewCount,
  hasLursoftProfile,
  jobVacancies,
  hasShop,
  onRatingClick
}) => {
  return (
    <div className="w-full bg-white dark:bg-card animate-scale-in border border-border/40 shadow-sm p-6 rounded-lg mb-8">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Vendor logo - increased size */}
        <Avatar className="h-40 w-40 rounded-lg border border-border/40 shadow-sm">
          <AvatarImage 
            src={vendor.logo || placeholderImage} 
            alt={vendor.name} 
            className="object-cover"
          />
          <AvatarFallback className="rounded-lg bg-secondary text-3xl">{vendor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        {/* Vendor info */}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-foreground">{vendor.name}</h1>
          
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="outline" className="rounded-md px-2 py-0.5 bg-secondary/50 whitespace-nowrap">
              Reg. Nr: {registrationNumber}
            </Badge>
            <Badge variant="outline" className="rounded-md px-2 py-0.5 bg-secondary/50 whitespace-nowrap">
              Since: {registrationDate}
            </Badge>
          </div>
          
          <div className="mt-1">
            <VendorInfoBadges
              city={vendor.city}
              category={vendor.category}
              rating={vendor.rating}
              reviewCount={reviewCount}
              hasLursoftProfile={hasLursoftProfile}
              jobVacancies={jobVacancies}
              hasShop={hasShop}
              distance={null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorHeader;
