
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Service {
  name: string;
  description?: string;
}

interface JobVacancy {
  id: number;
  title: string;
  location: string;
  type: string;
}

interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: string;
}

interface VendorServiceTabsProps {
  services: string[];
  jobVacancies: JobVacancy[];
  shopItems: ShopItem[];
}

const VendorServiceTabs: React.FC<VendorServiceTabsProps> = ({
  services,
  jobVacancies,
  shopItems,
}) => {
  return (
    <div className="space-y-6">
      {/* Keywords Card */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {services.map((service, index) => (
              <Badge 
                key={index} 
                variant="outline"
                className="rounded-sm px-2 py-0.5 bg-gray-200 text-black hover:bg-gray-300"
              >
                {service}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Services Block */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h4 className="font-medium">{service}</h4>
                  <p className="text-sm text-muted-foreground">
                    Professional {service.toLowerCase()} services tailored to your business needs.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Jobs Block */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Job Offers ({jobVacancies.length})</h3>
          {jobVacancies.length > 0 ? (
            <div className="space-y-4">
              {jobVacancies.map(job => (
                <Card key={job.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {job.location} · {job.type}
                        </p>
                      </div>
                      <Badge className="rounded-sm">Apply</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No job openings available at the moment.</p>
          )}
        </CardContent>
      </Card>
      
      {/* Shop Block */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Shop ({shopItems.length})</h3>
          {shopItems.length > 0 ? (
            <div className="space-y-4">
              {shopItems.map(item => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-medium">{item.price}</span>
                        <Badge className="rounded-sm">Buy Now</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No products available in the shop.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorServiceTabs;
