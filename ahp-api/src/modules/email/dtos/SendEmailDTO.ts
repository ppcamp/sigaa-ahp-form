import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

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

  @ApiPropertyOptional({
    type: String,
    description: 'Root matrix',
  })
  @IsOptional()
  @IsNotEmpty()
  rootMatrix: string;

  @ApiProperty({
    type: String,
    description: 'Matrix for the iterations in level 1 for Question 1',
  })
  @IsOptional()
  @IsNotEmpty()
  matrixQ1: string;

  @ApiProperty({
    type: String,
    description: 'Matrix for the iterations in level 2 for Question 1.2',
  })
  @IsOptional()
  @IsNotEmpty()
  matrixQ1S2: string;

  @ApiProperty({
    type: String,
    description: 'Matrix for the iterations in level 2 for Question 1.3',
  })
  @IsOptional()
  @IsNotEmpty()
  matrixQ1S3: string;

  @ApiProperty({
    type: String,
    description: 'Question 1.5',
  })
  @IsOptional()
  @IsNotEmpty()
  Q1S5: string;

  @ApiProperty({
    type: String,
    description: 'Matrix for the iterations in level 1 for Question 2',
  })
  @IsOptional()
  @IsNotEmpty()
  matrixQ2: string;

  @ApiProperty({
    type: String,
    description: 'Matrix for the iterations in level 1 for Question 3',
  })
  @IsOptional()
  @IsNotEmpty()
  matrixQ3: string;
}
