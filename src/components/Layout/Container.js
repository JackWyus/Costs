import styles from './Container.module.css'

function Container(props) {
  return (
    // Estamos dizendo que os elementos filhos que estão encapsulado dentro do componente Container em App, vão ser renderizado dentro dessa div
    <div className={`${styles.container} ${styles[props.customClass]}`}>
     {props.children}
    </div>
  )
}

export default Container;