import * as React from 'react';
import Link from 'next/link';
import { Icons } from '@/components/icons';

import { cn } from '@/lib/utils';
import { ButtonProps, buttonVariants } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

const PaginationContainer = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role='navigation'
    aria-label='pagination'
    className={cn('mx-auto flex w-fit justify-center overflow-hidden rounded-xl bg-white', className)}
    {...props}
  />
);
PaginationContainer.displayName = 'PaginationContainer';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn('flex flex-row flex-wrap items-center justify-center', className)}
      {...props}
    />
  )
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('', className)}
    {...props}
  />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<typeof Link>;

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'default' : 'ghost',
        size,
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to previous page'
    size='default'
    className={cn('gap-1 pl-2.5', className)}
    {...props}
  >
    <Icons.chevronLeft className='h-4 w-4' />
    <span>Précédant</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to next page'
    size='default'
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <span>Suivant</span>
    <Icons.chevronRight className='h-4 w-4' />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationFirst = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to next page'
    size='default'
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <Icons.chevronsLeft className='h-4 w-4' />
  </PaginationLink>
);
PaginationFirst.displayName = 'PaginationFirst';

const PaginationLast = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label='Go to next page'
    size='default'
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <Icons.chevronsRight className='h-4 w-4' />
  </PaginationLink>
);
PaginationLast.displayName = 'PaginationLast';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <Icons.moreHorizontal className='h-4 w-4' />
    <span className='sr-only'>More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalCount: number;
  range: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, itemsPerPage, totalCount, range, onPageChange }) => {
  const pagesCount = Math.ceil(totalCount / itemsPerPage);
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '';

  // generate PaginationLink * range
  let rangeItem = [];
  if (range * itemsPerPage >= totalCount) {
    for (let i = 1; i <= pagesCount; i++) {
      rangeItem.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={(e) => onPageChange(+(e.currentTarget.textContent || 1))}
            isActive={i === +page}
            href=''
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  } else {
    for (let i = 0; i < range; i++) {
      if (currentPage + i <= pagesCount) {
        rangeItem.push(
          <PaginationItem key={currentPage + i}>
            <PaginationLink
              onClick={(e) => onPageChange(+(e.currentTarget.textContent || 1))}
              isActive={currentPage + i === +page}
              href=''
            >
              {currentPage + i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
  }

  if (!(totalCount <= itemsPerPage))
    return (
      <PaginationContainer>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationFirst
                href=''
                onClick={(e) => onPageChange(1)}
              />
            </PaginationItem>
          )}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href=''
                onClick={(e) => onPageChange(currentPage - 1)}
              />
            </PaginationItem>
          )}
          {rangeItem}
          {currentPage + range <= pagesCount && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage !== pagesCount && (
            <PaginationItem>
              <PaginationNext
                href=''
                onClick={(e) => onPageChange(currentPage + 1)}
              />
            </PaginationItem>
          )}
          {currentPage !== pagesCount && (
            <PaginationItem>
              <PaginationLast
                href=''
                onClick={(e) => onPageChange(pagesCount)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </PaginationContainer>
    );
};

export {
  PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination,
  PaginationFirst,
  PaginationLast,
};
