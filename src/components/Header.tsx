interface HeaderProps {
  onToggleView?: () => void;
  currentView: 'map' | 'list';
}

const Header = ({ onToggleView, currentView }: HeaderProps) => {
  return (
    <header className="bg-amber-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">☕</span>
            <div>
              <h1 className="text-2xl font-bold">咖啡对了</h1>
              <p className="text-sm text-amber-100">北京精品咖啡地图</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleView}
              className="bg-amber-600 hover:bg-amber-800 px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <span>{currentView === 'map' ? '📋 列表' : '🗺️ 地图'}</span>
            </button>
            <button className="bg-amber-600 hover:bg-amber-800 px-4 py-2 rounded-lg">
              登录
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
