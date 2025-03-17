import { Profile } from "app/store/profile-store.types.ts";
import { ProfileTable } from "pages/profile-manager/ui/manager-table/manager-table.type.ts";

export const getProfileTableData = (profiles: Profile[]): ProfileTable[] => {
  if (profiles.length === 0) return [];

  return profiles.reduce((acc: ProfileTable[], profile: Profile) => {
    const { id, name, username, email, phone, address, company } = profile;
    acc.push({
      id,
      name,
      username,
      email,
      phone,
      address: `${address.street}, ${address.city}`,
      company: company.name,
    });
    return acc;
  }, [] as ProfileTable[]);
};
