interface AverageFuel {
  name_fuel: string;
  average_price: number;
}

export const getAverageFuel = async (): Promise<AverageFuel[]> => {
  const FUEL_NAME = ['Gazole', 'SP98', 'E10', 'SP95', 'E85', 'GPLc'];

  return await Promise.all(
    FUEL_NAME.map(async (fuel: string): Promise<AverageFuel> => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_FUEL}?select=AVG(prix_valeur)%20as%20average_price%2C%20prix_nom&where=prix_nom%3D%22${fuel}%22&limit=1`
      );
      const data = await response.json();

      return {
        name_fuel: data.results[0].prix_nom,
        average_price: data.results[0].average_price,
      };
    })
  );
};
