export class Meta {
  currentPage: number;
  max: number | null;
  size: number;
  lastPage: number | null = null;
  canPaging: boolean = false;
  constructor(
    data?: {
      currentPage: number | null;
      max: number | null;
      size: number | null;
    },
  ) {
    if (data) {
      this.currentPage = data.currentPage !== null ? Number(data.currentPage) : 1;
      this.max = data.max !== null ? Number(data.max) : null;
      this.size = data.size !== null ? Number(data.size) : 20;
    } else {
      this.currentPage = 1;
      this.max = null;
      this.size = 20;
    }
    if (this.currentPage && this.max !== null && this.size) {
      this.lastPage =  Math.ceil(this.max / this.size);
    }
    if (this.lastPage && this.currentPage < this.lastPage) {
      this.canPaging = true;
    }
  }
}

export function fetchedData(
  params: {
    meta: {
      currentPage: number | null;
      max: number | null;
      size: number | null;
    };
    data: any[];
  },
  list: {
    meta: Meta;
    data: any[];
  },
) : {
  meta: Meta;
  data: any[];
} {
  const meta = new Meta(params.meta);
  if (meta.currentPage === 1) {
    return {
      meta,
      data: params.data,
    };
  }
  params.data.forEach(row => list.data.push(row));
  return {
    meta,
    data: list.data,
  };
}
