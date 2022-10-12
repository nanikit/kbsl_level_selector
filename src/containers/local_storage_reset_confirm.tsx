export function LocalStorageResetConfirm() {
  const refresh = () => {
    window.location.reload();
  };
  const reset = () => {
    window.localStorage.clear();
    refresh();
  };

  return (
    <div className='h-[100vh] flex flex-col items-center justify-center text-[2vw] bg-gray-400'>
      <p>Ouch, there was an error. It may be due to corrupted data.</p>
      <div className='mt-[2vw] flex flex-row'>
        <button
          onClick={refresh}
          className='border-yellow-200 border-[0.1vw] rounded-[1vw] text-yellow-200 p-[1vw] hover:bg-yellow-500 hover:bg-opacity-30 transition text-[3vw] px-[5vw] font-bold'
        >
          Refresh
        </button>
        <button
          onClick={reset}
          className='ml-[5vw] border-red-200 border-[0.1vw] rounded-[1vw] text-red-200 p-[1vw] hover:bg-red-500 hover:bg-opacity-50 transition'
        >
          <p className='capitalize'>Full reset</p>
          <p className='text-[1.5vw]'>(All tournament data will be lost)</p>
        </button>
      </div>
    </div>
  );
}
