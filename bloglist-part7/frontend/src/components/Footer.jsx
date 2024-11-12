//component for rendering footer

const Footer = () => {
  //style for footer
  const FooterStyle = {
    backgroundColor: '#a5a58d',
    padding: 25,
    paddingRight: 50,
    textAlign: 'right', // Lisätty textAlign
  }

  //render footer
  return (
    <div style={FooterStyle}>
      <div>made by antti</div>
    </div>
  )
}

// exports
export default Footer
