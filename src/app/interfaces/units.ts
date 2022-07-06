export interface ICompanion {
  uid: number;
  uco: string;
  una: string;
  ppo: string;
  pla: number;
  plo:number;
  psp?: number;
  phe?: number;
  ana?: string;
  ctid?: number;
  acc?: string;
  eng?: string;
  tgo?: number;
  csm?: number;
  nta?: string;
  ntr?: string;
  gti?: string;
  gla?: number;
  glo?: number;
  csy?: string;
  cvi?: string;
  cor?: string;
  ucar?: {
    cpla?: string;
    econ?: string;
  }
}

export interface IUnidades {
  uid: number;
  una: string;
  ime: number;
  uco: string;
  usta: {
    uacc?: string;
    ueng?: string;
  },
  umod?: {
    utem?: false;
    ucan?: false;
    mfwd?: false;
    mhum?: false;
    mvia?: false;
  },
  ucar?: {
    cmdl?: string;
    cbrd?: string;
    csbb?: string;
    ccol?: string;
    ctyp?: string;
    cpla?: string;
    cvin?: string;
    econ?: string;
  },
  upos: {
    pldt: string;
    psat?: number;
    phea: number;
    plat: number;
    plon: number;
  },
  uala?: {
    aid?: number;
    anam?: string;
    aico?: string;
  },
  alt?: number;
  add?: string;
  spe?: number;
  oto?: number;
  bat?: number;
}