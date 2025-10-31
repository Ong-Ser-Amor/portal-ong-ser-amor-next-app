export default function Footer() {
  return (
    <footer className='border-t border-gray-200 bg-white px-6 py-4 text-center text-sm text-gray-600'>
      <p>
        © {new Date().getFullYear()} Portal Ong Ser Amor. Todos os direitos
        reservados.
      </p>
    </footer>
  );
}
