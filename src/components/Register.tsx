import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type TableRowProps = {
  id: number;
  code: string;
  description: string;
};

const TableRow: React.FC<TableRowProps> = ({ id, code, description }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (id >= 2 && id <= 4) {
          alert("Đợt đăng kí đã kết thúc");
        } else {
          navigate(`/register/${code}`);
        }
      };

  return (
    <tr className="cursor-pointer hover:bg-gray-200 h-14" onClick={handleClick}>
      <td className="text-center">{id}</td>
      <td className="text-blue-500">{code}</td>
      <td>{description}</td>
    </tr>
  );
};

const ScheduleTable: React.FC = () => {
  // Replace this with your actual data
  const Sdata: TableRowProps[] = [
    {
        id: 1,
        code: '222',
        description: 'Đăng ký các học phần có nhu cầu học HK2/2022-2023 tất cả các diện sinh viên',
      },
      {
        id: 2,
        code: '221',
        description: 'Đăng ký các học phần có nhu cầu học HK1/2022-2023 tất cả các diện sinh viên',
      },
      {
        id: 3,
        code: '212',
        description: 'Đăng ký các học phần có nhu cầu học HK2/2021-2022 tất cả các diện sinh viên',
      },
    {
      id: 4,
      code: '211',
      description: 'Đăng ký các học phần có nhu cầu học HK1/2021-2022 tất cả các diện sinh viên',
    },


    // Add more data here...
  ];

  const Idata: TableRowProps[] = [
    {
        id: 1,
        code: '222',
        description: 'Đăng ký các học phần có nhu cầu dạy HK2/2022-2023 tất cả các diện giảng viên',
      },
      {
        id: 2,
        code: '221',
        description: 'Đăng ký các học phần có nhu cầu dạy HK1/2022-2023 tất cả các diện giảng viên',
      },
      {
        id: 3,
        code: '212',
        description: 'Đăng ký các học phần có nhu cầu dạy HK2/2021-2022 tất cả các diện giảng viên',
      },
    {
      id: 4,
      code: '211',
      description: 'Đăng ký các học phần có nhu cầu dạy HK1/2021-2022 tất cả các diện giảng viên',
    },


    // Add more data here...
  ];

  const { user } = useAuth();
  const data = user?.role === 'student' ? Sdata :  Idata;




  return (
    <section className="w-screen h-screen px-4 py-4 mx-auto align-top mt-24" id="div-DanhSachHocKy">
      <div className="box box-primary box-solid">
        <div className="box-header with-border">
          <h3 className="box-title">&nbsp;&nbsp;</h3>
        </div>

        <div className="box-body no-padding">
          <table className="table-auto w-11/12">
            <thead>
              <tr>
                <th className="header_item_list " align="center">STT</th>
                <th colSpan={2} className="header_item_list " align="center">Đợt Đăng ký</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <TableRow key={row.id} {...row} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ScheduleTable;