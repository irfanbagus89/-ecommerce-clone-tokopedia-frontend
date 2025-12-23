import ReviewFilter from "./ReviewFilter";
import ReviewList from "./ReviewList";
import ReviewStats from "./ReviewStats";

const ProductReviews = () => {
  const reviewStats = {
    rating: 4.9,
    totalReviews: 1730,
    totalRating: 4562,
    satisfaction: 98,
    stars: [
      { star: 5, count: 4184, percent: 90 },
      { star: 4, count: 328, percent: 8 },
      { star: 3, count: 25, percent: 1 },
      { star: 2, count: 7, percent: 0.5 },
      { star: 1, count: 18, percent: 0.5 },
    ],
  };

  const reviews = [
    {
      id: 1,
      user: "Manganhouse",
      avatar: null, // null akan jadi inisial
      rating: 5,
      date: "1 bulan lalu",
      variant: "NB-S40 Perekat",
      content:
        "Nyaman dan daya serap nya oke banget..bikin si baby anteng dan gak cepet grumpy..",
      images: [
        "https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/ad4ca94af45a4046931c7b1ae146c29d~tplv-zr7vqa5nfb-resize-jpeg:800:0.image",
        "https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/addd29eb8eab42f39933bfdf9efad984~tplv-zr7vqa5nfb-resize-jpeg:800:0.image",
        "https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/63b13914e39747eba08253b8587e5ce2~tplv-zr7vqa5nfb-resize-jpeg:800:0.image",
      ],
      helpful: 12,
    },
    {
      id: 2,
      user: "T***S",
      avatar: null,
      rating: 5,
      date: "10 bulan lalu",
      variant: "NB-S40 Perekat",
      content: "Terima kasih sweety, sering sering promosi ya",
      images: [
        "https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/ad4ca94af45a4046931c7b1ae146c29d~tplv-zr7vqa5nfb-resize-jpeg:800:0.image",
        "https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/addd29eb8eab42f39933bfdf9efad984~tplv-zr7vqa5nfb-resize-jpeg:800:0.image",
        "https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/63b13914e39747eba08253b8587e5ce2~tplv-zr7vqa5nfb-resize-jpeg:800:0.image",
      ],
      helpful: 5,
    },
    {
      id: 3,
      user: "m***n",
      avatar: null,
      rating: 5,
      date: "10 bulan lalu",
      variant: "NB-S40 Perekat",
      content:
        "Pertama x order, pengiriman nya cepat. harga nya juga murceessss lagi 🥰 , Next aku order lagi 🤍",
      images: [
        "https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/ad4ca94af45a4046931c7b1ae146c29d~tplv-zr7vqa5nfb-resize-jpeg:800:0.image",
        "https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/addd29eb8eab42f39933bfdf9efad984~tplv-zr7vqa5nfb-resize-jpeg:800:0.image",
        "https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/63b13914e39747eba08253b8587e5ce2~tplv-zr7vqa5nfb-resize-jpeg:800:0.image",
      ],
      helpful: 8,
    },
  ];
  return (
    <section className="py-10 border-t mt-10" id="ulasan">
      <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase">
        Ulasan Pembeli
      </h2>
      <ReviewStats stats={reviewStats} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3 hidden lg:block">
          <ReviewFilter />
        </div>

        <div className="lg:col-span-9">
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </section>
  );
};
export default ProductReviews;
