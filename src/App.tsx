import { useState, useEffect, lazy, Suspense } from 'react'
import './App.css'

function App() {
  const [selectedIcon, setSelectedIcon] = useState<JSX.Element | null>(null)
  const [IconComponents, setIconComponents] = useState<{ [key: string]: React.FC<{ size: number }> } | null>(null)

  useEffect(() => {
    // `react-icons/fc` 모듈을 로드하고 아이콘 컴포넌트를 객체에 담습니다.
    import('react-icons/fc')
      .then((module:any) => setIconComponents(module))
      .catch((error) => console.error(error))
  }, [])

  // IconComponents가 null인 경우 로딩 중임을 표시하는 메시지를 표시합니다.
  if (!IconComponents) {
    return <div>Loading...</div>
  }

  // IconComponents 객체에서 모든 아이콘 컴포넌트를 가져와서 렌더링합니다.
  const icons = Object.keys(IconComponents).map((iconName) => {
    const IconComponent = IconComponents[iconName]
    return (
      <div className="icon" key={iconName} onClick={() => setSelectedIcon(<IconComponent size={50} />)}>
        <IconComponent size={30} />
        <span>{iconName}</span>
      </div>
    )
  })

  return (
    <div className="App">
      
      <h1>Select an icon:</h1>
      <div className="icon-container">{icons}</div>
      <h1>Selected icon:</h1>
      {selectedIcon || <div>No icon selected</div>}
    </div>
  )
}

export default App