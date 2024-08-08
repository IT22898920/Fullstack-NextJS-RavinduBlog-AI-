import PageTitle from '@/components/widgets/PageTitle';
import CreateCategory from 'components/admin/cetegory/CreateCategory';
import { Separator } from 'components/ui/separator';
import React from 'react';

export default function page() {
  return (
    <div className="bg-color-grey">
      <div className="flex justify-between">
        <PageTitle title="Category" />
        <CreateCategory />
      </div>
      <Separator className="my-4 border-b-[2px] border-color-light-blue" />
      dfdfr
    </div>
  );
}