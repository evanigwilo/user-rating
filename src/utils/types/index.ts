import { HexString } from "@polkadot/util/types";
import { devAccounts } from "../constants";

export type Spacing = {
  margin?: string;
  padding?: string;
};

export type RowType = Partial<{
  highlight: boolean;
  backgroundLoading: boolean;
  hover: boolean;
}>;

export type AccountType = typeof devAccounts[number];

export type Candidates = Record<HexString, HexString[]>;
