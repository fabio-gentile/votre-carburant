import { AverageFuel } from '@/types';

export const getAverageFuel = async (): Promise<{ averageFuel: AverageFuel[]; totalCount: number }> => {
  const FUEL_NAME = ['Gazole', 'SP98', 'E10', 'SP95', 'E85', 'GPLc'];

  const response = await Promise.all(
    FUEL_NAME.map(async (fuel: string): Promise<AverageFuel> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_FUEL}?select=AVG(prix_valeur)%20as%20average_price%2C%20prix_nom%2C%20COUNT(*)%20as%20count&where=prix_nom%3D%22${fuel}%22&limit=1`
      );
      const data = await response.json();

      return {
        name_fuel: data.results[0].prix_nom,
        average_price: data.results[0].average_price,
        count: data.results[0].count,
      };
    })
  );

  const totalCount = response.reduce((total, fuel) => total + fuel.count, 0);

  return { averageFuel: response, totalCount };
};
