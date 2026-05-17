export interface DesignItem {
  id: string;
  url: string;
  title?: string;
  category: 'designs' | 'animated';
  createdAt: number;
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  createdAt: number;
}

export const INITIAL_DESIGNS: DesignItem[] = [
  {
    id: 'd-1',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/v1778496830/5769272485042916987_ujjdjt.jpg',
    category: 'designs',
    createdAt: Date.now() - 100000,
  },
  {
    id: 'd-2',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/v1778496829/5769272485042916986_jvemfl.jpg',
    category: 'designs',
    createdAt: Date.now() - 90000,
  },
  {
    id: 'd-3',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/v1778496829/5769272485042916985_e9lewe.jpg',
    category: 'designs',
    createdAt: Date.now() - 80000,
  },
  {
    id: 'd-4',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/v1778496828/5769272485042916984_lnhyuw.jpg',
    category: 'designs',
    createdAt: Date.now() - 70000,
  },
  {
    id: 'd-5',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/v1777029505/6005605057665109392_sbiyyc.jpg',
    category: 'designs',
    createdAt: Date.now() - 60000,
  },
  {
    id: 'd-6',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/v1778500795/5769272485042917012_mgiccz.jpg',
    category: 'designs',
    createdAt: Date.now() - 50000,
  },
  {
    id: 'd-7',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/v1778500795/5769272485042917011_h7kpve.jpg',
    category: 'designs',
    createdAt: Date.now() - 40000,
  },
  {
    id: 'd-8',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/v1778501227/5769272485042917015_qgjxbs.jpg',
    category: 'designs',
    createdAt: Date.now() - 30000,
  },
  {
    id: 'd-9',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/v1777029504/6005605057665109391_gewdxb.jpg',
    category: 'designs',
    createdAt: Date.now() - 25000,
  },
  {
    id: 'd-10',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/v1778496829/5769272485042916989_df1dxo.jpg',
    category: 'designs',
    createdAt: Date.now() - 24000,
  },
  {
    id: 'd-11',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/v1777029503/6005605057665109390_yfh2pw.jpg',
    category: 'designs',
    createdAt: Date.now() - 23000,
  },
  {
    id: 'd-12',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/v1777029503/6005605057665109389_pgthnz.jpg',
    category: 'designs',
    createdAt: Date.now() - 22000,
  },
  {
    id: 'd-13',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/v1777029380/6005605057665109363_t9b9gz.jpg',
    category: 'designs',
    createdAt: Date.now() - 21000,
  },
  {
    id: 'd-14',
    url: 'https://res.cloudinary.com/deo45saux/image/upload/f_auto,q_auto,w_600/v1771892918/White_and_Green_Burger_Social_Media_Graphic_whrgft.png',
    category: 'designs',
    createdAt: Date.now() - 20000,
  },
  {
    id: 'd-15',
    url: 'https://res.cloudinary.com/deo45saux/image/upload/f_auto,q_auto,w_600/v1771891989/1600w-Xn2zcYGK_DQ_jr23he.webp',
    category: 'designs',
    createdAt: Date.now() - 19000,
  },
  {
    id: 'd-16',
    url: 'https://res.cloudinary.com/deo45saux/image/upload/f_auto,q_auto,w_600/v1771892678/Red_and_White_Modern_Shawarma_Masculine_Instagram_Post_x4qeks.png',
    category: 'designs',
    createdAt: Date.now() - 18000,
  },
  {
    id: 'd-17',
    url: 'https://res.cloudinary.com/deo45saux/image/upload/f_auto,q_auto,w_600/v1771891910/1600w-cfTtLz1eiM4_rfjcpx.webp',
    category: 'designs',
    createdAt: Date.now() - 17000,
  },
  {
    id: 'd-18',
    url: 'https://res.cloudinary.com/deo45saux/image/upload/f_auto,q_auto,w_600/v1771891667/1280w-ANidpBnqwI4_tunuro.webp',
    category: 'designs',
    createdAt: Date.now() - 16000,
  },
  {
    id: 'd-19',
    url: 'https://res.cloudinary.com/deo45saux/image/upload/f_auto,q_auto,w_600/v1771891559/1280w-lxsERL-AFOo_nyt4cn.webp',
    category: 'designs',
    createdAt: Date.now() - 15000,
  },
  {
    id: 'd-20',
    url: 'https://res.cloudinary.com/deo45saux/image/upload/f_auto,q_auto,w_600/v1771891338/1600w-O1hXi2mGeA4_ju5m2k.webp',
    category: 'designs',
    createdAt: Date.now() - 14000,
  },
  {
    id: 'd-21',
    url: 'https://res.cloudinary.com/deo45saux/image/upload/f_auto,q_auto,w_600/v1771892436/Orange_and_Brown_Modern_Food_Promo_Instagram_Post_uckxvd.png',
    category: 'designs',
    createdAt: Date.now() - 13000,
  },
  {
    id: 'd-22',
    url: 'https://res.cloudinary.com/deo45saux/image/upload/f_auto,q_auto,w_600/v1771892171/1600w-366DDNyeJAs_wwshxf.webp',
    category: 'designs',
    createdAt: Date.now() - 12000,
  },
  {
    id: 'd-23',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/f_auto,q_auto,w_600/v1770687311/design5_etba1z.webp',
    category: 'designs',
    createdAt: Date.now() - 11000,
  },
  {
    id: 'd-24',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/f_auto,q_auto,w_600/v1770687311/design11_hcdqpb.webp',
    category: 'designs',
    createdAt: Date.now() - 10000,
  },
  {
    id: 'd-25',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/f_auto,q_auto,w_600/v1770687311/design2_yf9iq8.webp',
    category: 'designs',
    createdAt: Date.now() - 9000,
  },
  {
    id: 'd-26',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/f_auto,q_auto,w_600/v1770687311/design4_femfq2.webp',
    category: 'designs',
    createdAt: Date.now() - 8000,
  },
];

export const INITIAL_ANIMATED: DesignItem[] = [
  {
    id: 'a-1',
    url: 'https://res.cloudinary.com/deo45saux/image/upload/f_auto,q_auto,w_600/v1771890738/m1_kwu8xd.png',
    category: 'animated',
    createdAt: Date.now() - 7000,
  },
  {
    id: 'a-2',
    url: 'https://res.cloudinary.com/deo45saux/image/upload/f_auto,q_auto,w_600/v1771890734/h1_rwtrbs.png',
    category: 'animated',
    createdAt: Date.now() - 6000,
  },
  {
    id: 'a-3',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/f_auto,q_auto,w_600/v1770687311/designd_1_hlbpiq.webp',
    category: 'animated',
    createdAt: Date.now() - 5000,
  },
  {
    id: 'a-4',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/f_auto,q_auto,w_600/v1770687311/designc_1_eyfwm6.webp',
    category: 'animated',
    createdAt: Date.now() - 4000,
  },
  {
    id: 'a-5',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/f_auto,q_auto,w_600/v1770687311/s5a_1_d6mbzd.webp',
    category: 'animated',
    createdAt: Date.now() - 3000,
  },
  {
    id: 'a-6',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/f_auto,q_auto,w_600/v1770687311/ani_lpagld.webp',
    category: 'animated',
    createdAt: Date.now() - 2000,
  },
  {
    id: 'a-7',
    url: 'https://res.cloudinary.com/dbtmgo0zj/image/upload/f_auto,q_auto,w_600/v1770687311/ani1_mtbjgt.webp',
    category: 'animated',
    createdAt: Date.now() - 1000,
  },
];

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'v-1',
    title: 'Alhamdulillah – Kwesi Arthur ft Black Sherif & Big Hommie Flee Official 3D Animated Music Video',
    thumbnailUrl: 'https://img.youtube.com/vi/386ej72GYa0/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=386ej72GYa0',
    createdAt: Date.now() - 60000,
  },
  {
    id: 'v-2',
    title: 'Black Sherif – Top of the Morning 3D Animated Visual | Fan Made',
    thumbnailUrl: 'https://img.youtube.com/vi/-8uIM31sBos/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=-8uIM31sBos',
    createdAt: Date.now() - 50000,
  },
  {
    id: 'v-3',
    title: 'Rich Billionaire Fell in Love With a Mad Woman',
    thumbnailUrl: 'https://img.youtube.com/vi/9y1UjqN8I2w/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=9y1UjqN8I2w',
    createdAt: Date.now() - 40000,
  },
  {
    id: 'v-4',
    title: 'Chrono Link: The Future of Humanity',
    thumbnailUrl: 'https://img.youtube.com/vi/xyWfuewv3wI/hqdefault.jpg',
    videoUrl: 'https://youtu.be/xyWfuewv3wI',
    createdAt: Date.now() - 30000,
  },
  {
    id: 'v-5',
    title: 'Chrono Link: Seconds Before Tomorrow',
    thumbnailUrl: 'https://img.youtube.com/vi/S49paqxE6T0/hqdefault.jpg',
    videoUrl: 'https://youtu.be/S49paqxE6T0',
    createdAt: Date.now() - 20000,
  },
  {
    id: 'v-6',
    title: 'Love Under the Baobab Tree',
    thumbnailUrl: 'https://img.youtube.com/vi/9pD5hQNStpo/hqdefault.jpg',
    videoUrl: 'https://youtu.be/9pD5hQNStpo',
    createdAt: Date.now() - 10000,
  },
];
