export const LoadingAnimation = () => {
  return (
    <div className="inline-block w-5 h-5 border-2 border-t-2 border-r-transparent border-white rounded-full animate-spin"></div>
  );
};

export const Loading = () => {
  return (
    <div className="loading">
      <img src="/public/loading1.gif" alt="" />
    </div>
  );
};
