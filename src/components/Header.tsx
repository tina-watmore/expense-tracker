import Image from 'next/image';

type HeaderProps = {
  title: string;
  subtitle: string;
};

export default function Header({title, subtitle} : HeaderProps) {
  return (
    <header>
      <div className="page-title"> 
        <h1 className="title">{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </div>
      <div className="user-info-wrapper">
        <div className="user-details">
            <h3 className="user-name">Tina Watmore</h3>
            <h4 className="user-status">Pro budgeteer</h4>
        </div>
        <div className="user-image-wrapper">
            <Image
                className="user-image"
                src="/tina-pic-01.png"
                alt="Tina's profile image"
                layout="fill"
                objectFit="cover"
            />
        </div>
      </div>
    </header>
  );
}
