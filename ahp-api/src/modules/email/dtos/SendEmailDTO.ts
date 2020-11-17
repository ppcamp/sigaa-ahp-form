import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SendEmailDTO {
  @ApiProperty({
    type: String,
    description: 'Name of person that will send the email',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'Email of person that will send the email',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Root matrix',
  })
  @IsNotEmpty()
  rootMatrix: string;

  @ApiProperty({
    type: String,
    description: 'Matrix for the iterations in level 1 for Question 1',
  })
  @IsNotEmpty()
  matrixQ1: string;

  @ApiProperty({
    type: String,
    description: 'Matrix for the iterations in level 2 for Question 1.2',
  })
  @IsNotEmpty()
  matrixQ1S2: string;

  @ApiProperty({
    type: String,
    description: 'Matrix for the iterations in level 2 for Question 1.3',
  })
  @IsNotEmpty()
  matrixQ1S3: string;

  @ApiProperty({
    type: String,
    description: 'Question 1.5',
  })
  @IsNotEmpty()
  Q1S5: string;

  @ApiProperty({
    type: String,
    description: 'Matrix for the iterations in level 1 for Question 2',
  })
  @IsNotEmpty()
  matrixQ2: string;

  @ApiProperty({
    type: String,
    description: 'Matrix for the iterations in level 1 for Question 3',
  })
  @IsNotEmpty()
  matrixQ3: string;
}
