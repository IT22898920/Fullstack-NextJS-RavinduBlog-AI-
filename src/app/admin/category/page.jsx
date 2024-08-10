import PageTitle from '@/components/widgets/PageTitle';
import { getCategories } from 'actions/categoryActions';
import CreateCategory from 'components/admin/cetegory/CreateCategory';
import ListCategory from 'components/admin/cetegory/ListCategory';
import { Separator } from 'components/ui/separator';
import React from 'react';

export default async function page() {
    const allCategories = await getCategories();
    const categories = JSON.parse(allCategories);
    console.log(categories)

  return (
    <div className="bg-color-grey">
      <div className="flex justify-between">
        <PageTitle title="Category" />
        <CreateCategory />
      </div>
      <Separator className="my-4 border-b-[2px] border-color-light-blue" />
      <ListCategory categories={categories} />
    </div>
  );
}