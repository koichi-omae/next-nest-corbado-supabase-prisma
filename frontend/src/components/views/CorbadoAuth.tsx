function CorbadoAuthPresentation() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <corbado-auth project-id={process.env.NEXT_PUBLIC_PROJECT_ID} conditional='yes'>
        <input
          name='username'
          id='corbado-username'
          data-input='username'
          required
          autoComplete='webauthn'
        />
      </corbado-auth>
    </div>
  );
}

export default function CorbadoContainer() {
  return <CorbadoAuthPresentation />;
}
