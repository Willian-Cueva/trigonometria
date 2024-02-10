import styles from './styles/Loader.module.css'

export default function Loader ({ text = '' }) {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-black'>
      <div className={`${styles.spinner}`} />
      <p className='text-gray-500 mt-4'>Cargando {text} ...</p>
    </div>

  )
}
